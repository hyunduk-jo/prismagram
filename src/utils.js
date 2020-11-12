import { adjectives, nouns } from "./words";
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import jwt from "jsonwebtoken";   //JWT 생성을 위한 import

//두개의 단어로 이루어진 secret을 만들어냄
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length)
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
}

//메일 전송
const sendMail = (email) => {
  const auth = {
    auth: {
      api_key: process.env.MG_API_KEY,
      domain: process.env.MG_DOMAIN
    }
  }
  const client = nodemailer.createTransport(mg(auth));
  return client.sendMail(email);
}

//메일 전송하는데 필요한 내용
export const sendSecretMail = (address, secret) => {
  const email = {
    from: "duk@prismagram.com",
    to: address,
    subject: "🔒Login Secret for prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to login`
  };
  return sendMail(email);
}

//JWT 토큰 생성
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);