import React from "react";

import Linkedin from "../icons/Linkedin";
import Facebook from "../icons/Facebook";
import X from "../icons/X";

const SocialMediaLinks = ({ profile }) => (
  <div className="mt-3">
    <a href={profile?.facebook_link ?? ""} className="mx-2">
      <Facebook />
    </a>
    <a href={profile?.linkedin_link ?? ""} className="mx-2">
      <Linkedin />
    </a>
    <a href={profile?.twitter_link ?? ""} className="mx-2">
      <X />
    </a>
  </div>
);

export default SocialMediaLinks;
