# 📉 Hot Takes Hedging

**A Satirical ✨*Agentic AI*✨ Powered Investment Advice Site**

A joke project that doubles as a showcase of using:

* AWS Lambda & S3
* REST APIs

---

## What It Does

Uses [TheNewsAPI](https://www.thenewsapi.com/) to periodically pull headlines and summaries from:

* **Politics**
* **Business**
* **Past topics of interest**

Then uses AI to recommend investment actions based on the news

---

## 📦 Build & Run Instructions

Lambda function code is located in `/lambda/handler.py`.
Use `package.ps1` to generate a `.zip` ready to upload to AWS Lambda.

---

## 🚧 Future Upgrades (for me or you!)

*  CI/CD pipeline setup
*  Community voting for future research topics
*  Comment section or user-generated prompts
*  More AI personas generating alternative advice based on the same data
