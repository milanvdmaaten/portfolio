---
title: Floorplanner
tagline: UX and visual design improvements
date: 2021-12-07T19:40:46.180Z
displayPosition: 2
featuredImage: header2.png
textColor: text-black
drawColor: "#46A7ED"
headerColor: "#FEC15B"
backgroundColor: "#fff"
content:
  - type: textBlock
    body: |-
      My role: UX Design, UI Design, User interviews

      Year: 2021

      Project completed at Valsplat with my colleague Julian Neef
  - type: textBlock
    title: About
    body: >-
      ## Roomplanner, part of Floorplanner


      Roomplanner is an extension of Floorplanner. A platform, based around a floor plan editor that runs in every browser. The tool gives users the ability to make great looking architectural visualisations of their home and interior in an easy and accessible way. Floorplanner was the first fully browser-based 2D & 3D planner, and since then over 25 million users worldwide have registered for a account and in together created over 40 million plans and a multitude of great 2D & 3D images.


      Roomplanner is embedded within home and living product webshops. Users use Roomplanner to view the webshops' products in a room they created themselves.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        image: 01.png
        alt: Explore sofas
  - type: textBlock
    title: The challenge
    body: >-
      There are several challenges we solved during this project. First, the
      tool is not very user-friendly, a lot of functionalities are spread over
      the tool without any hierarchy. Next to that, the visual style of
      Roomplanner doesn't fit the style of the webshops. Finally, the relevance
      for webshops to embed Roomplanner within their webshop is to generate
      leads. However, users don't see the point of leaving behind their email
      address.


      In order to solve these challenges, we conducted user interviews with the target audience of Roomplanner.
  - type: textBlock
    title: Solutions
    body: >-
      ## Adding step 1 to the step indicator


      When opening Roomplanner, users pick a room type which is followed by step 2: selecting a room shape. A step indicator shows the current step to the user. However, this indicator is missing at step 1, which implies that users start the onboarding at step 2. That's why we added the step indicator to step 1 as well.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        image: 02.png
        alt: Old design of onboarding step 1.
        title: Old design of onboarding step 1.
      - titlePosition: center
        image: 03.png
        alt: Old design of onboarding step 2
        title: Old design of onboarding step 2
      - titlePosition: center
        image: 04.png
        alt: New design of step 1 in the onboarding.
        title: New design of step 1 in the onboarding.
      - titlePosition: center
        image: 05.png
        alt: New design of step 2 on the onboarding.
        title: New design of step 2 on the onboarding.
  - type: textBlock
    body: "At step 2 users are asked to select a room shape, followed by step 3: the
      room configurator in which windows can be added and dimensions of the room
      can be set. Step 2 and 3 offer the possibility to add windows and doors to
      the room shape. However, the test results showed that no participant made
      use of this functionality. That's why indicators were added to the
      elements that could be manipulated on the screen, which trigger the user
      to play with the shape and position of the elements on the screen."
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: left
        image: 06.png
        alt: Old design without indicators that walls and doors can be moved.
        title: Old design without indication that walls and doors can be moved.
  - type: imagesBlock
    size: fullWidth
    carrousel: false
    images:
      - titlePosition: center
        image: 07.png
        alt: New design shows move indicators and extra options when hovering a wall.
        title: New design shows move indicators and extra options when hovering a wall.
  - type: textBlock
    body: In general, the onboarding lacks of focus and some functionalities were
      not found by the participants. That's why we divided the onboarding in 5
      steps. Each step focuses on one goal which increases a users' focus within
      a specific step.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        image: 08.png
        alt: Old onboarding
        title: Old onboarding
      - titlePosition: center
        image: 09.png
        alt: New onboarding
        title: New onboarding
  - type: textBlock
    body: >-
      ## Adding focus to the homescreen


      Users don't expect to change the roomshape once they finished the onboarding. It’s a process they’ve completed, so why doing it again?


      That's why we moved this functionality from the home screen to 'room settings' in the menu. This contributes to goal of the homescreen; furnishing and styling the room.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        alt: New home screen in which the room shape can be edited behind the 'Room
          settings' option.
        title: New home screen in which the room shape can be edited behind the 'Room
          settings' option.
        image: 10.png
  - type: textBlock
    body: >-
      ## Replacing icons with labels


      The interview results showed that participants were clicking back and forth between the menu items, because the icons didn't speak for themselves. That's why we replaced the icons with labels.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        image: 11.png
        alt: Old menu without labels.
        title: Old menu without labels.
      - titlePosition: center
        image: 12.png
        alt: New menu with labels.
        title: New menu with labels.
  - type: textBlock
    body: >-
      ## 2D is edit mode, 3D is view mode


      Another insight we gained was that users expect to move furniture in 2D and 3D mode. The difference between the two is that the 3D mode is a view only, and doesn't offer the possibility to move furniture. The switch component implies that 2D and 3D offer the same functionalities because they're presented next to each other. That's why we removed the '2D' label, because this is the default mode in which users are already editing. Next to that, we changed the label from '3D' to '3D view' which makes the functionality more clear.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        image: 13.png
        alt: Old design in which '2D' and '3D' are presented next to each other.
        title: Old design in which '2D' and '3D' are presented next to each other.
      - titlePosition: center
        image: 14.png
        alt: New design of the '3D' view functionality.
        title: New design of the '3D' view functionality.
  - type: textBlock
    body: >-
      ## An easier way of painting surfaces


      Another adjustment we made was the way walls and floors could be painted. Participants were confused by the fact that a wall could be painted from both sides, which doesn't make any sense because they are furnishing just one room. We removed the functionality to paint the outside of a wall. Next to that, we added the different surfaces that could be painted to the menu.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        image: 15.png
        alt: Old way of painting the room.
        title: Old way of painting the room.
      - titlePosition: center
        image: 16.png
        alt: New way of painting the room.
        title: New way of painting the room.
  - type: textBlock
    body: >-
      ## An easier way of exploring furniture


      Participants experienced difficulties with finding furniture in the menu. Users start within their 'favorites' tab. Even when they didn't add any favorites yet. Next to that, the way furniture could be explored differs a lot from patterns users are familiar with in other webshops. That's why we added patterns of webshops to the way furniture could be explored.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        image: 17.png
        alt: New way of exploring furniture.
        title: New way of exploring furniture.
      - titlePosition: center
        image: 18.png
        alt: New way of exploring furniture.
        title: New way of exploring furniture.
  - type: textBlock
    body: >-
      ## Adding hierarchy to the checkout flow


      The final modal which asks to leave behind the users’ email address in order to save the design, lacks  hierarchy. Too much irrelevant information is presented at the same time, which results in confusion.


      That's why we split up the modal over 2 modals; the first one, which asks to leave behind an email address in order to save the design. The second one (less relevant) asks if the user wants some help with the design from an Ethan Ellan designer.
  - type: imagesBlock
    size: medium
    carrousel: false
    images:
      - titlePosition: center
        image: 19.png
        alt: Old modal in which design can be saved.
        title: Old modal in which design can be saved.
      - titlePosition: center
        image: 20.png
        alt: New modal in which design can be saved.
        title: New modal in which design can be saved.
      - titlePosition: center
        image: 21.png
        alt: New design of the second modal in which help of an Ethan Allen designer is
          offered.
        title: New design of the second modal in which help of an Ethan Allen designer
          is offered.
  - type: textBlock
    body: >-
      [Research
      report](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a053796e-978e-4943-bc03-bdd5371868c6/4724_-_Rapportage_Roomplanner.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211211T234634Z&X-Amz-Expires=86400&X-Amz-Signature=c66a153da8ca43f6d468436b6c4bd145bb8c035d2e031c39f5d34a4d0999e41f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Research%2520report%2520UX%2520interviews.pdf%22&x-id=GetObject)
      (Dutch) ›


      [Final design in prototype](https://www.figma.com/proto/fSnmswH3v65iCCt9ockdql/Design-1.0-(Copy)?page-id=0%3A1&node-id=55%3A1704&viewport=241%2C48%2C0.5&scaling=scale-down&starting-point-node-id=55%3A1704) (with rational) ›


      [Final design](https://www.figma.com/file/fSnmswH3v65iCCt9ockdql/?node-id=0%3A1) (Figma) ›
    title: Project documentation
---
