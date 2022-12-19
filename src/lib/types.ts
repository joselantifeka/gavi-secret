import React, { ReactNode } from "react";

export interface userLoginProps {
  name: string;
  year: string;
  id: number;
}

export interface participantsTypes{
  IdSecretFriend: number,
  LastName: string,
  alreadyRaffle: boolean,
  desire: string,
  id: number,
  name: string,
  secretFriend: string,
  urlImg: string | null,
  keyName: string | null,
}
