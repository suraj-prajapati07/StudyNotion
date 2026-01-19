const express = require('express');
const app = express();
//Routes...................
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/ContactUs");
//Database............
const {connectWithDB} = require('./config/database');
//Cloudinary..........
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 4000;
//DB connection.....
connectWithDB();
//cloudinary connection......
cloudinaryConnect();
//middlewares.....
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:["http://localhost:3000","https://study-notion-nine-roan.vercel.app"],
		credentials:true,
		optionSuccessStatus:200,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//mounting routes...........
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//default route.........
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`);
});
