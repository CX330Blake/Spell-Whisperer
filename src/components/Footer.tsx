import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <div className="flex-col w-full">
            <div className="flex justify-center items-center">
                <div className="font-playwrite text-md">
                    - Made by CX330 with love -
                </div>
            </div>
            <br />
            <div className="flex justify-center items-center space-x-10">
                <FaXTwitter size={30} />
                <FaGithub size={30} />
                <FaFacebook size={30} />
                <FaLinkedin size={30} />
            </div>
        </div>
    );
}
