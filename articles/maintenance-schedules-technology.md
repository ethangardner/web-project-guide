---
layout: article
title: Maintenance Schedules for Technology
date: 2023-04-15
teaser: Using a schedule for review of critical pieces of technology 
tags:
- Process
audience:
- Developers
---
Our web presence has a lot of moving parts. Checking on their operation can be an important practice to avoid any surprises. Below is a list of things that should get reviewed and suggested intervals for doing so.

## Risk-based
These may need immediate attention based on their severity. The schedule on these is often out of our control as new vulnerabilities are discovered and patches are released. Ideally, there is some automation involved such as using WPVulnDb

- Security vulnerabilities for critical pieces of code, infrastructure, and architecture (e.g. Server OS, 3rd party libraries and services, WordPress core and plugins, ElasticSearch, etc)

## Annually
These often correspond with budgets or part of a larger conversation around technical direction. More frequent reviews may be warranted in some cases.

- AWS cost savings measures and schedules.
  - Savings plans for EC2 
  - Reserved Instances for RDS
  - Compute savings plans for Lambda
  - Overall usage of cloud resources - i.e. are we provisioned correctly
  - New instance classes
- AWS Workload review (aka. Well Architected Review with AWS)
- Browser usage statistics

## Semi-annually
- Cache hit rate (Cloudflare)
- Non-critical patches for dependencies - e.g. npm packages and node versions 
- AWS Lambda and serverless function runtimes
- Database query optimization (Cloudwatch logs)

## Quarterly
- Uptime monitoring (Pingdom)
- Competitor web performance benchmarks (WebPageTest)

## Monthly
- Web performance (Speedcurve)
- AWS Costs

## Infrequently
- Dead code identification and removal
- Frequent 404 URLs (Google Analytics and Cloudflare)
