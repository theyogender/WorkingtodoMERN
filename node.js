const express1 = require('express');
const parser = require('body-parser')
const path = require('path');
const { deleteModel } = require('mongoose');
const dir = path.join(__dirname)
const app = express1();

app.use(parser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express1.static(dir))

const middle1 = async (req, resp, next) => {      //checking Number and password for login
    const model = await require(`${dir}/login_database.js`);
    const check = await model.findOne({ 'Number': req.body.Number })

    if (check == null) {

        await resp.sendFile(`${dir}/regis.html`);
    }

    else {
        if (req.body.Number == check.Number) {
            if (check.Password == req.body.Password)
                next()
            else
                resp.send('<h1>Plz Enter Right Password</h1>')

        }
    }
}


const middle = async (req, resp, next) => {          //Checking whether this number is registered or not
    const model = await require(`${dir}/login_database.js`);
    const check = await model.findOne({ 'Number': req.body.Number })

    if (check == null) {
        next()
    }
    else { resp.send(`<canter><h1 style='font-size:150%;'>You have already this number</h1></center>`); }

}



app.post('/login', middle1, async (req, resp) => {

    const model = await require(`${dir}/login_database.js`);
    const check = await model.findOne({ 'Number': req.body.Number })
      
    
    resp.render('student', {check})
      }
   
 )

app.get('/signup', (req, resp) => {

    resp.sendFile(`${dir}/regis.html`);

})
app.post('/signup', middle, async (req, resp) => {

    const model = await require(`${dir}/login_database.js`);
    // const count = await model.count();
    const d = await new model({ Name: req.body.name,Father_Name: req.body.Father_Name, Number: req.body.Number, Password: req.body.password ,email:req.body.email,class:req.body.class})
    const df = await d.save();
    if (df) {
        resp.sendFile(`${dir}/responce.html`);
    }

})




app.listen(3000)