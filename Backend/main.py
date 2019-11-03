import os

from flask import Flask, render_template, request,redirect,url_for,session,send_from_directory
from flask_session import Session
from mysql.connector import connection
app = Flask(__name__)
app.config['SESSION_TYPE'] = 'memcached'
app.config['SECRET_KEY'] = 'potato'
app.config.from_object(__name__)
Session().init_app(app)
uname=""
uid=0

cnx=None
cursor=None
def connect_db():
	global cnx,cursor
	cnx= connection.MySQLConnection(user='root',password='',host='34.73.94.207',database='main')
	cursor = cnx.cursor()

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/scss/<path:path>')
def send_scss(path):
    return send_from_directory('scss', path)

@app.route('/vendor/<path:path>')
def send_vendor(path):
    return send_from_directory('vendor', path)

def conn_end():
	cursor.close()
	cnx.close()

def insert_val(table,vals):
	queries=["INSERT INTO users(name, email, pwd)VALUES ( %s, %s, %s)","INSERT INTO user_product(uid,pid)VALUES ( %d, %s)","INSERT INTO users(name, energy,material,emissions)VALUES ( %s, %s, %s, %s)"]
	cursor.execute(queries[table],(i for i in vals))
	cnx.commit()

def query_val(table,vals):
	queries=["select * from users where email=\""+vals+"\"","select pid from user_product where uid= \""+str(vals)+"\"","select * from products where pid= "+str(vals)]
	print queries[table]

	cursor.execute(queries[table])
	return cursor.fetchall()


@app.route('/logout')
def logout():
    global uname
    uname=""
    return redirect('/')

@app.route('/')
def index():

    if uname!='':
        products=["4ocean Reusable Bottle - Blue","100% Recycled Plastic Trash Bags ","Avocado Green Mattress"]
        return render_template("index.html",value=uname,product=products,future=20)
    else:
        return render_template("index.html",value="Guest",product=["N/A"],future=0)

@app.route('/login', methods=['GET','POST'])
def login():
    connect_db()
    error = None
    if request.method == "POST":
        email=request.form['email']
        pwd=request.form['password']
        print email,pwd

        val=query_val(0,str(email))
        print val
        if val!=[]:
            val=val[0][3]
            name=query_val(0,str(email))[0][1]
            uid=query_val(0,str(email))[0][0]
        print pwd,val
        if pwd!=val:
            error = 'Invalid Credentials. Please try again.'
        else:
            global uname
            uname=name
            session['key']=name
            return redirect('/')
    conn_end()
    return render_template('login.html', error=error)

@app.route('/index.html')
def indexht():
    return render_template('index.html')
@app.route('/search.html')
def search():
    return render_template('search.html')
app.route('/emissions.html')
def emissions():
    return render_template('emissions.html')



@app.route('/recent.html')
def recent():
    return render_template('recent.html')
	
