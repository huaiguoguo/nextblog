import { Avatant, Avatar, Divider } from "antd";
import "../public/style/components/author.css";

const Author = () => {
	return (
		<div className="author-div comm-box">
			<div>
				<Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg" />
			</div>
			<div className="author-introduction">
				专注于WEB和移动前端开发和服务端开发
				<Divider>社交账号</Divider>
				<Avatar size={28} icon="github" className="account"></Avatar>
				<Avatar size={28} icon="qq" className="account"></Avatar>
				<Avatar size={28} icon="wechat" className="account"></Avatar>
			</div>
		</div>
	);
};

export default Author;
