import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length)
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
}

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

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "duk@prismagram.com",
    to: address,
    subject: "🔒Login Secret for prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to login`
  };
  return sendMail(email);
}