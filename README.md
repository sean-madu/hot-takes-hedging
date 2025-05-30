# 📉 Hot Takes Hedging

**A Satirical ✨*Agentic AI*✨ Powered Investment Advice Site**

A joke project that doubles as a showcase of using:

* AWS Lambda & S3
* REST APIs
* React + Typescript

---

## What It Does

Uses [TheNewsAPI](https://www.thenewsapi.com/) to periodically pull headlines and summaries from:

* **Politics**
* **Business**
* **Past topics of interest**

Then uses AI to recommend investment actions based on the news (please do **NOT** follow them, it is meant as a showcase of how **BAD** it can be, not as financial advice)

---

## 📦 Build & Run Instructions

Run `./package.ps1` to generate `.zip` files for all lambdas or `./package.ps1 -FoldersToBuild foo, bar` to generate a `.zip` for each folder specified, upload these to AWS Lambda.

---

## 🚧 Future Upgrades (for me or you!)
*  Use python or something other than .ps1 script for making lambda, or maybe just a better system in general when you do CI/CD
*  CI/CD pipeline setup
*  Community voting for future research topics
*  Comment section or user-generated prompts
*  More AI personas generating alternative advice based on the same data
