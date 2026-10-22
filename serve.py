"""Static server for the deck (npm start).

python3 -m http.server keeps a listen backlog of 5, so when the deck loads two
dozen diagram SVGs at once some connections get reset and those diagrams show
"failed to load". This is the same server with a deeper backlog. It also sends
Cache-Control: no-store, so a plain reload always picks up edits to slides.md,
talk.css and the diagrams.
"""
import http.server, sys

class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 256
    daemon_threads = True

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
with Server(("127.0.0.1", port), Handler) as httpd:
    print(f"Serving the deck at http://localhost:{port}")
    httpd.serve_forever()
