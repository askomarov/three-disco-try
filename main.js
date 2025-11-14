import "./style.css";
import Sketch from "./three";

console.log("hello js asd");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    // new Sketch("canvas");
    new Sketch({
      dom: document.querySelector("#canvas"),
    });
    window.addEventListener("load", () => {
      //
    });
  },
  true
);
