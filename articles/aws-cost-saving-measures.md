---
layout: article
title: AWS Savings Plans
date: 2023-04-28
teaser: Cost reduction on AWS
tags:
- Web Performance
audience:
- Developers
---
AWS is responsible for delivering most of our web experience to the end users, and given how much traffic our sites receive, it can get quite expensive. 

To help with cost control, there are several actions that we can take to make sure our bills stay within reasonable limits. One such method is using savings plans. 

## Savings Plans
A savings plan on AWS means that you commit to a certain amount of usage every month in exchange for a discounted price. The commitments are either 1-year or 3-year agreements with AWS and how they work depends on the product. You can commit to payment terms of entirely upfront, partially upfront, or no upfront cost. The no upfront cost is typically what we buy.

### Compute Plan
A compute savings plan is the most flexible, and that is the advantage of this program. It covers EC2, Lambda, and Fargate. With this plan, you have flexibility to change EC2 instance types, regions, and tenancy. If there is the possibility for unpredicted fluctuations in traffic, new geographic market strategies, or the need to change instance types, this is a great option. The downside is that this type of plan doesn't receive as much of a discount as the EC2 Instance Savings Plan. 

It would make sense to use this type of plan if we wanted flexibility to move instances either in region or want to try out different instance types, like the AWS ARM-based processors for example.

### EC2 Instance Savings Plans 
Most of the plans that we use today are EC2 Instance Savings Plans. In this plan, we commit to using a specific instance type, tenancy, and region in exchange for a reduced rate. This offers the deepest discount but less flexibility than the Compute Plan. 

To calculate the commitment, it's necessary to take an inventory and see if any instances can be decommissioned or downgraded, or alternatively if we need to add more instances to scale or want to move to a different asset family when newer types are available.

Commitments are done by the hour, so simply multiply your instances type and number of instances by the cost given on the [savings plan calculator](https://aws.amazon.com/savingsplans/compute-pricing/) to come up with the number. 

| Instance Type | Quantity | Savings Plan Rate ($) |
|---------------|----------|-----------------------|
| c3.large      | 1        | 0.073                 |
| r5.2xlarge    | 3        | 0.318                 |
| m4.xlarge     | 1        | 0.1239                |
| t2.large      | 5        | 0.0575                |
| t2.medium     | 1        | 0.0287                |
| t2.micro      | 3        | 0.0072                |
| ...           | ...      | ...                   |

Assuming that everything in the table above was running 24/7, our commitment to each instance family would be as follows.

| Instance Family | Hourly commitment ($) |
|-----------------|-----------------------|
| c3              | 0.073                 |
| r5              | 0.954                 |
| m4              | 0.1239                |
| t2              | 0.3378                |

If there are multiple instance types in each family you have to add them up to get the total commitment per instance family. For example, we have 3 instances in the r5 family (all r5.2xlarge) and a total of 9 instances in the t2 family (5 t2.large, 1 t2.medium, and 3 t2.micro). 

```
// t2 instance family calculation
(5 * 0.0575) + (1 * 0.0287) + (3 * 0.0072) = 0.3378 
```

__Use a spreadsheet and get your math right__. Since these are contractual agreements, they are an absolute pain to cancel if you make a mistake.

## Reserved Instances (Database product)
To save on database spend, AWS also allows you to commit to a specific database type in exchange for a discounted rate known as a Reserved Instance (RI).  Unlike the EC2 Savings Plans that are by family (e.g. r5), the RIs are for the type (e.g. r5.2xlarge). You also have to commit to a specific DB engine like aurora-mysql, and whether the instance is going to be a multi or single availability zone.

Similar to the terms on the Compute and EC2 Savings Plans, these are 1-year or 3-year agreements with options to pay the entire cost upfront, partially upfront, or no upfront. We have been buying the no upfront, 1 year option.

## Media Delivery
Media delivery costs are another expensive part of running our business. In order to reduce this cost, we use AWS Cloudfront and buy the cost savings package for that as well. Known as the [Security Savings Bundle](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/savings-bundle.html), we commit to spending a certain amount on this each month. It's easiest to estimate this based on overall bandwidth per region and calculate the price from there.

The cost savings with the security savings plan is 30% off the standard data transfer rate. The US and Canada are in the cheapest price class at $0.075/GB, so if we reliably used 10TB of data in this region every month, our commitment would be as follows: 

```
// Cost commitment formula
// Data Transfer in GB * Price class cost per GB * discounted rate

(1024GB * 10) * $0.075 * 0.7 = $537.60
```

These plans can be combined. For example, we could commit to $500 per month in April, and if we notice we are exceeding that number for a few months, we could buy another plan in September to cover the difference.
