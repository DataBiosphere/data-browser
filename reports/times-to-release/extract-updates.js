(function(numUpdates) {
	
	let updates = [],
		contentElems = document.querySelector("#hcaContent > div > div").children;
	
	for (let e of contentElems) {
		if (e.tagName === "H4" && /^[a-z]+-\d\d-\d\d\d\d$/.test(e.id)) {
			if (updates.length === numUpdates) break;
			updates.push([e.id]);
		} else if (e.tagName === "H3" || e.tagName === "H4") {
			updates[updates.length - 1].push(e.textContent);
		} else if (e.tagName === "OL") {
			let update = updates[updates.length - 1];
			if (!Array.isArray(update[update.length - 1])) update.push([]);
			e.querySelectorAll("a").forEach(a => {
				if (/^https:\/\/data\.humancellatlas\.org\/explore\/projects\//.test(a.href)) {
					update[update.length - 1].push(a.href);
				}
			});
		}
	}
	
	return "\r\n" + updates.map(update => {
		let hasContent = false,
			result = [
				"\t[",
				...update.map((item, i) => {
					if (typeof item === "string") {
						if (i === 0) {
							return "\t\t" + JSON.stringify(item) + ",";
						} else if (Array.isArray(update[i + 1]) && update[i + 1].length > 0) {
							hasContent = true;
							return ["\t\t", "\t\t// " + item];
						} else {
							return null;
						}
					} else {
						if (item.length > 0) return item.map(url => "\t\t" + JSON.stringify(url) + ",");
						else return null;
					}
				}),
				"\t\t",
				"\t],"
			];
		
		if (hasContent) return result;
		else return null;
	}).flat(2).filter(item => item !== null).join("\r\n");
	
})(1);