import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString,ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { MemberRole, Role } from "src/global/globalEnum";


class PersonalInfo {

    @IsString()
    bring_here: String;
    @IsString()
    current_role: String;
    @IsString()
    like_focus: String;

    @ValidateNested()
    @Type(()=>ListTeamEmail)
    team_emails: [ListTeamEmail];
}

class ListTeamEmail {
    @IsEmail()
    email: string;

    @IsEnum(MemberRole)
    role: string
}

export class UserDto {
    @IsNotEmpty()
    full_name: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    account_name: string;


    @ValidateNested()
    @Type(()=>PersonalInfo)
    personal_info:PersonalInfo
}




