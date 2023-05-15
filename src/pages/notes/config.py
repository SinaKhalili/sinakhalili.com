"""
Configuration for local and deploy environments
"""

class Config:
    def __init__(self, base_url):
        self.base_url = base_url

# Update each URL to your local and deploy URLs
development = Config('http://localhost:8000')
deploy = Config('https://notes.sinakhalili.com')
