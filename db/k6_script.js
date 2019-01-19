import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "300s",
  rps: 500
};


export default function() {
  var productId
  var rand = Math.random();
  if (rand > 0.7) {
  	productId = Math.floor(1 + Math.random()*10000000);
  } else {
  	productId = Math.floor(9000000 + Math.random()*1000);
  }
  const res = http.get(`http://localhost:3004/products/${productId}`);
  check(res, {
    success: res => res.status === 200,
  });
  // sleep(0.05);
  
  // var rand = Math.random();
  // if (rand > 0.9) {
  // } else {
  // 	num = Math.floor(Math.random()*1000)
  // }
};