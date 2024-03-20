const AcceptanceEmailTemplate = (requestData, target, service) => {
  const payDate = new Date();
  payDate.setDate(payDate.getDate() + 1 * 7);
  const newDate = payDate.toLocaleDateString();

  return `

  <div
  style="font-family: PT Sans Bold 14pt, Arial, Helvetica, sans-serif; margin: 0; padding: 32px; background-color: #f6f7fb; color: #38447e;">
  <h2 style="
          color: var(--dark-blue-header, #222F65);
          font-family: Roboto;
          font-size: 19.96px;
          font-style: normal;
            font-weight: 700;
            line-height: normal;
            margin: 0px 0px 0px 39px;
            
            ">
    TeamWyrk
    <span style="
          color: var(--dark-blue-header, #222F65);
          font-feature-settings: 'clig' off, 'liga' off;
          font-family: PT Sans;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px; /* 250% */
          /* margin: 0px 0px 0px 70px; */
          ">built by Bootcamp2
    </span>
  </h2>
  <!-- <p style="margin: 4px 40px;">built by Bootcamp2</p> -->
</div>
<div style="max-width: 450px; margin: 20px auto; background: #ffffff; border: 1px solid #000000; border-radius: 12px;">
  <div style="padding: 1rem 20px 0; text-align: center; color: #38447e;">
    <!-- Logo can be added here -->
    <h1 style="
    color: var(--Primary, #37447e);
    font-size: 24px;
    font-weight: 700;
    line-height: 32px; /* 133.333% */
    margin-bottom: 0;
    padding: 0;
    ">
      ${requestData.name} has accepted your help!
    </h1>
  </div>
  <div style="
          font-feature-settings: 'clig' off, 'liga' off;
          font-size: 16px;
          font-weight: 400;
          line-height: 125%; /* 20px */
          color: #202124;
          margin-bottom: 20px;
          padding: 20px;
          ">
    <p>Hi ${target},</p>
    <p>
      ${requestData.name} has accepted your help. You will need to schedule an offline meeting with
      ${requestData.name}. Please contact ${requestData.name} via email. You must complete the service by
      <b>${newDate}</b> for the payment to be processed.

    </p>
    <p style="color: #000; margin: 0; padding: 0">
      Best,<br />TeamWyrk
    </p>
  </div>
  <div style="
            background-color: #FFF;
            color: #000;
            border: solid .1rem #bac3e5;
            border-radius: .9rem;
            box-shadow: 0 0.4rem 0.4rem rgba(0,0,0,0.25);
            box-sizing: border-box;
            flex-shrink: 0;
            /* height:9.8rem; */
            margin:0 3.2rem 3rem;
            overflow: hidden;
            padding: 1.5rem;
            position: relative;
            /* width:386px; */
            ">
    <div style="display: flex; width: fit-content; align-items: center;">
      <div style="background-image: url(${requestData.profile_image});
                background-color: #222F65;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            border-radius: 2.5rem;
            flex-shrink: 0;
            height:50px;
            
            width:50px;"></div>
      <span style="margin-left:2rem; font-size: .75rem;  ">
        Name: ${requestData.name}
        <br />
        Service Requested: ${service}
        <br />
        Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${requestData.email}"
          target="blank">${requestData.email}</a>
      </span>
    </div>
  </div>
  <div
    style="background-color: #EFF2FC; color: black; padding: 30px 20px; text-align: center; font-size: 0.8em; border-radius: 12px;">
    Have a question? <a href="https://www.teamwyrk.org/" style="color: blue;">Contact our support team.</a>
  </div>
</div>
      `;
};

export default AcceptanceEmailTemplate;