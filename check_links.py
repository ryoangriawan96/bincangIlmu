#!/usr/bin/env python3
import os
import re
import sys
from urllib.parse import urljoin, urlparse
from pathlib import Path

# Configuration
BASE_DIR = Path(__file__).parent.resolve()
HTML_EXTENSIONS = {'.html', '.htm'}
CSS_EXTENSIONS = {'.css'}
JS_EXTENSIONS = {'.js'}

# Patterns for extracting URLs
HTML_ATTR_PATTERN = re.compile(r'(?:href|src)=["\']([^"\']*)["\']', re.IGNORECASE)
CSS_URL_PATTERN = re.compile(r'url\(["\']?([^"\')\s]+)["\']?\)', re.IGNORECASE)

def is_external(url):
    """Check if URL is external (has scheme)"""
    parsed = urlparse(url)
    return bool(parsed.scheme) and parsed.scheme in ('http', 'https')

def resolve_path(base_path, url):
    """Resolve a URL relative to base_path, returning absolute Path if local, else None"""
    # Remove fragment and query
    url = url.split('#')[0].split('?')[0]
    if not url:
        return None
    if is_external(url):
        return None  # external
    # Join with base directory of the file containing the URL
    resolved = (base_path.parent / url).resolve()
    # Ensure it's within BASE_DIR (security)
    try:
        resolved.relative_to(BASE_DIR)
    except ValueError:
        # Outside project, treat as external? but we'll skip
        return None
    return resolved

def check_html_file(file_path):
    """Check a single HTML file for broken links"""
    try:
        content = file_path.read_text(encoding='utf-8')
    except Exception as e:
        print(f"Error reading {file_path}: {e}", file=sys.stderr)
        return []
    broken = []
    # Find all href/src attributes
    for match in HTML_ATTR_PATTERN.finditer(content):
        url = match.group(1)
        resolved = resolve_path(file_path, url)
        if resolved is None:
            # external or empty, skip existence check
            continue
        if not resolved.exists():
            broken.append((file_path, url, str(resolved)))
    return broken

def check_css_file(file_path):
    """Check a CSS file for url() references"""
    try:
        content = file_path.read_text(encoding='utf-8')
    except Exception as e:
        print(f"Error reading {file_path}: {e}", file=sys.stderr)
        return []
    broken = []
    for match in CSS_URL_PATTERN.finditer(content):
        url = match.group(1)
        resolved = resolve_path(file_path, url)
        if resolved is None:
            continue
        if not resolved.exists():
            broken.append((file_path, url, str(resolved)))
    return broken

def main():
    broken_links = []
    # Walk through all files
    for root, dirs, files in os.walk(BASE_DIR):
        # Skip node_modules, .git, etc.
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('node_modules',)]
        for file in files:
            file_path = Path(root) / file
            ext = file_path.suffix.lower()
            if ext in HTML_EXTENSIONS:
                broken_links.extend(check_html_file(file_path))
            elif ext in CSS_EXTENSIONS:
                broken_links.extend(check_css_file(file_path))
            # Optionally check JS for import paths? skip for now
    if broken_links:
        print("Broken links found:")
        for file_path, url, resolved_path in broken_links:
            print(f"  {file_path}: {url} -> {resolved_path}")
        print(f"\nTotal: {len(broken_links)} broken links")
        return 1
    else:
        print("No broken links found.")
        return 0

if __name__ == '__main__':
    sys.exit(main())