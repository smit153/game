<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import Menu from "./menu";
import "./Canvas.css";
import Chat from "../gameChat/Chat";
import UserData from "../gameChat/UserData";
import Timer from "../Timer/Timer";

function Canvas({ socket, username, room }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.5);
  const [turn, setTurn] = useState(false);
  //const classname="col-2 users";
  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);
  //console.log(word);
  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };
  // Function for end the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };
  // Function for drawing
  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };

  const gameOver = () => {
    var base64ImageData = canvasRef.current.toDataURL("image/png");
    socket.emit("canvasData", base64ImageData);
    //console.log(base64ImageData);
  };
  setInterval(gameOver, 250);
  useEffect(() => {
    socket.on("canvasDraw", (imageData) => {
      var image = new Image();

      //console.log("image1");

      image.onload = function () {
        for (let i = 0; i <= 3; i++) {
          //console.log("image2");
          ctxRef.current.drawImage(image, 0, 0);
        }
      };
      ctxRef.current.filter = "opacity(100%)";
      image.src = imageData;
    });
    socket.on("roundOver", () => {
      setTurn(false);
    });
    // socket.on("turn", () => {
    //   setTurn(true);
    //   console.log("turn");
    // });
    //console.log(turn);
  }, [socket]);
  return (
    <div className="container-fluid">
      <div className="App row " onTouchEnd={endDrawing} onMouseUp={endDrawing}>
        <UserData classname={"col-2 users"} socket={socket} room={room} />
        <div
          className="draw-area col-7 "
          //className={"draw-area col-7" + (turn ? "" : " disabled")}
        >
          <div
            onMouseMove={draw}
            onTouchMove={draw}
            onTouchStart={startDrawing}
            onMouseDown={startDrawing}
          >
            <Timer sec={15} socket={socket} gameOver={gameOver} />
            <canvas
              ref={canvasRef}
              width={window.innerWidth * 0.582}
              height={window.innerHeight * 0.7}
            />
          </div>
          <Menu
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            setLineOpacity={setLineOpacity}
            ctx={ctxRef.current}
            canvas={canvasRef.current}
          />
        </div>
        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}
export default Canvas;
=======
import React, { useEffect, useRef, useState } from "react";
import Menu from "./menu";
import "./Canvas.css";
import Chat from "../gameChat/Chat";
import UserData from "../gameChat/UserData";
import Timer from "../Timer/Timer";

function Canvas({ socket, username, room }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.5);
  //const classname="col-2 users";
  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);
  //console.log(word);
  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };
  // Function for end the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };
  // Function for drawing
  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };
  const gameOver = () => {
    var base64ImageData = canvasRef.current.toDataURL("image/png");
    socket.emit("canvasData", base64ImageData);
    //console.log(base64ImageData);
  };
  useEffect(() => {
    socket.on("canvasDraw", (imageData) => {
      var image = new Image();
      image.src = imageData;
      console.log("image1");
      setLineOpacity(100);
      image.onload = function () {
        console.log("image2");
        ctxRef.current.drawImage(image, 0, 0);
      };
    });
  }, [socket]);
  return (
    <div className="container-fluid">
      <div className="App row " onTouchEnd={endDrawing} onMouseUp={endDrawing}>
        <UserData classname={"col-2 users"} socket={socket} room={room} />
        <div className="draw-area col-7">
          <div
            onMouseMove={draw}
            onTouchMove={draw}
            onTouchStart={startDrawing}
            onMouseDown={startDrawing}
          >
            <Timer sec={15} socket={socket} gameOver={gameOver} />
            <canvas
              ref={canvasRef}
              width={window.innerWidth * 0.582}
              height={window.innerHeight * 0.7}
            />
          </div>
          <Menu
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            setLineOpacity={setLineOpacity}
            ctx={ctxRef.current}
            canvas={canvasRef.current}
          />
        </div>
        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}
export default Canvas;
>>>>>>> 00fc28fc7a12fb3edb5a6ed82d8d94181f2cc987
