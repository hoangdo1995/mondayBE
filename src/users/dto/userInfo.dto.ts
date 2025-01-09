import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { MemberRole, Role } from "src/global/globalEnum";

class PersonalInfo {

    @ValidateNested()
    @Type(()=>ListTeamEmail)
    team_emails: [ListTeamEmail];
}

export class ListTeamEmail {
    @IsEmail()
    email: string;

    @IsEnum(MemberRole)
    role: string
}

export class UserInfo {
    @IsNotEmpty()
    @MinLength(5)
    full_name: string;

    

    @IsEmail()
    email: string;

    @ValidateNested()
    @Type(() => PersonalInfo)
    personal_info: PersonalInfo;
}

