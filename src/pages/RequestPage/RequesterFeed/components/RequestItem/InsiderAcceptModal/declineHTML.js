const getDeclineHTMLEmail= (userName) => { 
  return `
<div style="width: 1075px; height: 703px; background: #f6f7fb">
      <div
        style="
          background: var(--Blue-Fill, #eff2fc);
          color: #eff2fc;
          width: 450px;
          height: 60px;
        "
      >
        TeamWyrk built by Bootcamp2
      </div>
      <div>
        <h1
          style="
            color: var(--Primary, #5943e4);
            font-family: PT Sans;
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: 32px; /* 133.333% */
            width: 351px;
            height: 25px;
          "
        >
          You have been declined
        </h1>
        <p
          style="
            color: #202124;

            font-feature-settings: 'clig' off, 'liga' off;
            /* Body 1 */
            font-family: PT Sans;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 125%; /* 20px */
          "
        >
          You are receiving this email to inform you that ${userName} has
          declined your help. The request will be removed from your feed.
          Best,Teamwyrk
        </p>
      </div>
      <div
        style="
          color: #202124;

          font-feature-settings: 'clig' off, 'liga' off;
          font-family: Roboto;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 135.687%; /* 18.996px */
          letter-spacing: 0.04px;
        "
      >
        Have a question?
        <p
          style="
            color: #05f;
            font-feature-settings: 'clig' off, 'liga' off;
            font-family: Roboto;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 135.687%;
            letter-spacing: 0.04px;
            text-decoration-line: underline;
          "
        >
          Contact our support team.
        </p>
      </div>
    </div>
`;
};

export default getDeclineHTMLEmail;