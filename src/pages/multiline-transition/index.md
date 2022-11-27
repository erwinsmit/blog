---
title: Multiline underline transition
date: '2022-11-27'
spoiler: How to create a multiline underline transition
---

For a project I had to implement an underline transition on text links. For single line transitions there are lot of examples where you set a background on a pseudo element. For multiline I had look a bit harder. I found this [great example](https://nickymeuleman.netlify.app/blog/css-animated-wrapping-underline) for multiline underline transitions. I tweaked it a bit so the animation flows from left to right. See below for a React implementation (extending MUI's Link component). 

<iframe src="https://codesandbox.io/embed/animated-multi-line-underline-dbmg1g?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="animated-multi-line-underline"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>