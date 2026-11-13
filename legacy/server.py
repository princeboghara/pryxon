#!/usr/bin/env python3
"""
PRYXON STUDIO - HIGH-PERFORMANCE STATIC & API SERVER
Zero-dependency, fast, secure Python 3 server.
- Static file serving (with MIME types, cache control, compression friendly)
- REST API: /api/inquiries (GET, POST, PATCH, DELETE)
- Secret Admin Auth Verification: /api/admin/verify
"""

import http.server
import socketserver
import json
import os
import sys
import urllib.parse
from datetime import datetime
import uuid

PORT = 3001
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'inquiries.json')
ADMIN_PASSCODE = os.environ.get('PRYXON_ADMIN_KEY', 'pryxon@2026')

# Ensure data directory exists
os.makedirs(os.path.join(BASE_DIR, 'data'), exist_ok=True)
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f, indent=2)

def load_inquiries():
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return []

def save_inquiries(inquiries):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(inquiries, f, indent=2, ensure_ascii=False)

class PryxonHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def _send_json(self, status_code, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # API: Get all inquiries
        if parsed.path == '/api/inquiries':
            auth_header = self.headers.get('Authorization', '')
            # If authorized or client reading
            inquiries = load_inquiries()
            # Sort newest first
            inquiries.sort(key=lambda x: x.get('createdAt', ''), reverse=True)
            self._send_json(200, {'success': True, 'inquiries': inquiries, 'total': len(inquiries)})
            return

        # Fallback to standard static file server
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)

        # API: Verify Admin Passcode
        if parsed.path == '/api/admin/verify':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            try:
                data = json.loads(raw_body.decode('utf-8'))
            except Exception:
                data = {}

            passcode = data.get('passcode', '')
            if passcode == ADMIN_PASSCODE:
                token = f"pkn_{uuid.uuid4().hex}"
                self._send_json(200, {'success': True, 'token': token, 'role': 'architect_admin'})
            else:
                self._send_json(401, {'success': False, 'message': 'Invalid administrative passcode.'})
            return

        # API: Submit New Client Inquiry
        if parsed.path == '/api/inquiries':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            try:
                data = json.loads(raw_body.decode('utf-8'))
            except Exception:
                self._send_json(400, {'success': False, 'message': 'Invalid JSON body.'})
                return

            name = str(data.get('name', '')).strip()
            email = str(data.get('email', '')).strip()
            service = str(data.get('service', '')).strip()
            budget = str(data.get('budget', '')).strip()
            details = str(data.get('details', '')).strip()

            if not name or not email or not details:
                self._send_json(400, {'success': False, 'message': 'Missing required fields (name, email, details).'})
                return

            service_names = {
                'web-dev': 'Web Development & SaaS Platforms',
                'ecommerce': 'E-Commerce & D2C Storefronts',
                'mobile-app': 'Mobile App (iOS & Android)',
                'custom-software': 'Custom Enterprise Software / Cloud',
                'whatsapp-crm': 'WhatsApp CRM & Lead Generation',
                'ai-automation': 'AI Automations & LLM Workflows',
                'other': 'Custom Digital Solution'
            }

            budget_labels = {
                '1k-3k': '$1k – $3k',
                '3k-8k': '$3k – $8k',
                '8k-15k': '$8k – $15k',
                '15k+': '$15k+'
            }

            new_inquiry = {
                'id': f"inq_{uuid.uuid4().hex[:10]}",
                'name': name,
                'email': email,
                'service': service or 'other',
                'serviceName': service_names.get(service, service or 'Custom Scope'),
                'budget': budget or '3k-8k',
                'budgetLabel': budget_labels.get(budget, budget or 'Undisclosed'),
                'details': details,
                'status': 'new',
                'createdAt': datetime.utcnow().isoformat() + 'Z',
                'ip': self.client_address[0] if self.client_address else '127.0.0.1'
            }

            inquiries = load_inquiries()
            inquiries.insert(0, new_inquiry)
            save_inquiries(inquiries)

            self._send_json(201, {'success': True, 'message': 'Inquiry received successfully.', 'inquiry': new_inquiry})
            return

        self._send_json(404, {'success': False, 'message': 'Endpoint not found.'})

    def do_PATCH(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/inquiries':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            try:
                data = json.loads(raw_body.decode('utf-8'))
            except Exception:
                self._send_json(400, {'success': False, 'message': 'Invalid JSON.'})
                return

            inquiry_id = data.get('id')
            new_status = data.get('status')
            if not inquiry_id or not new_status:
                self._send_json(400, {'success': False, 'message': 'id and status required.'})
                return

            inquiries = load_inquiries()
            updated = False
            for inq in inquiries:
                if inq.get('id') == inquiry_id:
                    inq['status'] = new_status
                    inq['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
                    updated = True
                    break

            if updated:
                save_inquiries(inquiries)
                self._send_json(200, {'success': True, 'message': 'Status updated.'})
            else:
                self._send_json(404, {'success': False, 'message': 'Inquiry not found.'})
            return

        self._send_json(404, {'success': False, 'message': 'Endpoint not found.'})

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.startswith('/api/inquiries'):
            query = urllib.parse.parse_qs(parsed.query)
            inquiry_id = query.get('id', [None])[0]
            if not inquiry_id:
                content_length = int(self.headers.get('Content-Length', 0))
                if content_length > 0:
                    try:
                        data = json.loads(self.rfile.read(content_length).decode('utf-8'))
                        inquiry_id = data.get('id')
                    except Exception:
                        pass

            if not inquiry_id:
                self._send_json(400, {'success': False, 'message': 'Inquiry id is required.'})
                return

            inquiries = load_inquiries()
            initial_count = len(inquiries)
            inquiries = [x for x in inquiries if x.get('id') != inquiry_id]
            if len(inquiries) < initial_count:
                save_inquiries(inquiries)
                self._send_json(200, {'success': True, 'message': 'Inquiry deleted successfully.'})
            else:
                self._send_json(404, {'success': False, 'message': 'Inquiry not found.'})
            return

        self._send_json(404, {'success': False, 'message': 'Endpoint not found.'})

if __name__ == '__main__':
    class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
        allow_reuse_address = True

    with ThreadedTCPServer(("", PORT), PryxonHandler) as httpd:
        print(f"Pryxon Server active at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.shutdown()
