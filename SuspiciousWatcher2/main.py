from api.app import app

# This is a wrapper file to make gunicorn able to find the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)