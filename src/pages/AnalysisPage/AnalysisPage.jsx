import { checkToken } from "../../utilities/users-service";
import debug from "debug";
import * as recordsService from "../../utilities/records-service"

const log = debug("mern:pages:AnalysisPage");

export default function AnalysisPage({  }) {
	const handleCheckToken = async () => {
		const expDate = await checkToken();
		log(expDate);
	};

	
	return (
		<>
			<h1>Analysis</h1>
		</>
	);
}
