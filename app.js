const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const hbs = require("hbs");
const exphbs = require("express-handlebars");
const router = require ('./controller/routes')

/*
// for creating eq  handlebar helper
hbs.registerHelper("eq", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
*/

const Hbs = exphbs.create({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/mainLayouts"),
    partialsDir: path.join(__dirname, "partials"),
});
app.use(router)

app.use('/deleteCoverPhoto',router)
app.use('/deletePdf',router)
app.use('/deleteLinkNotification',router)
app.use(express.static(path.join(__dirname, "public")));

app.use("/addmissionPdf", express.static(path.join(__dirname, "./public/addmissionPdf")));
app.use("/pdfNotification", express.static(path.join(__dirname, "./public/uploads/pdfNotification")));
app.engine("handlebars", Hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// REGISTER PARTIALS
hbs.registerPartials(path.join(__dirname, "partials"));
//database connection
mongoose.connect("mongodb+srv://shahiin:Homa@123@homa-database.euytk2u.mongodb.net/HOMAd?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

let db = mongoose.connection;
db.on("error", () => console.log("error connecting database"));
db.once("open", () => console.log("connected to the database"));

app.get("*", (req, res) => {
    res.render("404", { errorcomment: "Opps! Page not Available" });
});
app.listen(3001, () => {
    console.log('Server for Homa listening on port 3001');
});

