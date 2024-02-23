function writeCookie(name, value, days) {
	var days = 10; // the number at the left reflects the number of days for
					// the
	// cookie to last
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameSG = name + "=";
	var nuller = '';
	if (document.cookie.indexOf(nameSG) == -1)
		return nuller;

	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameSG) == 0)
			return c.substring(nameSG.length, c.length);
	}
	return null;
}

function cleanCookie(name) {
	writeCookie(name, "", 1);
}

function getCurrentPage() {
	if (typeof this.href === "undefined") {
		return document.location.toString().toLowerCase();
	} else {
		return this.href.toString().toLowerCase();
	}
}

function createFrame(page, id, form) {
	var iframe = document.createElement("iframe");
	iframe.setAttribute("width", "100%");
	iframe.setAttribute("height", "100%");
	iframe.setAttribute("frameborder", "0");
	iframe.setAttribute("scrolling", "no");
	iframe.setAttribute("id", id);
	iframe.setAttribute("src", "http://"
			+ window.location.href.split('//')[1].split('/')[0] + page);

	var iform = document.getElementById(form);
	iform.parentNode.appendChild(iframe);
}

function createHiddenFrame(page, id, form) {
	
	console.log('form: '+form)
	var iframe = document.createElement("iframe");
	iframe.setAttribute("style", "visibility:hidden; display:none;");
	iframe.setAttribute("width", "0");
	iframe.setAttribute("height", "0");
	iframe.setAttribute("frameborder", "0");
	iframe.setAttribute("scrolling", "no");
	iframe.setAttribute("id", id);
	iframe.setAttribute("src", "http://"
			+ window.location.href.split('//')[1].split('/')[0] + page);

	var iform = document.getElementById(form);
	iform.parentNode.appendChild(iframe);
}

function dropFrame(id, form) {
	var iframe = document.getElementById(id);
	var iform = document.getElementById(form);
	iform.parentNode.removeChild(iframe);
}

function dataClear(ele) {
	$(ele).find(':input').each(function() {
		switch (this.type) {
		case 'password':
		case 'select-multiple':
		case 'select-one':
		case 'text':
		case 'textarea':
			$(this).val('');
			break;
		case 'checkbox':
		case 'radio':
			this.checked = false;
		}
	});
}

function urlGet(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}

function popUpOpen(url, title, conf) {
	var poppedWindow = window.open(url, title.replace(/[^a-z0-9]/gi, ''), conf);
	var msg = 'Para utilizar essa funcionalidade, seu navegador deve estar com o bloqueador de popups desativado.';
	if (!poppedWindow)
		alert(msg);
	else {
		poppedWindow.onload = function() {
			setTimeout(function() {
				if (poppedWindow.screenX === 0) {
					alert(msg);
				} else {
					// close the test window if popups are allowed.
					poppedWindow.close();
				}
			}, 0);
		};
	}
}

function enable_component(components, widget) {
	for ( var i in components) {
		if (document.getElementById(components[i]).value.length == 0) {
			widget.disable(1);
			widget.disable(2);
			widget.disable(3);
			return;
		}
	}

	widget.enable(1);
	widget.enable(2);
	widget.enable(3);
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validateMultipleEmails(emails) {
	var emailList = emails.split(";");

	for ( var i in emailList) {
		if (validateEmail(emailList[i].replace(/ /g, "")) == false)
			return false;
	}

	return true;
}

function currencyBoxFormat(objeto, sMask, evtKeyPress) {
	var sValue, fldLen, sCod;
	
	sValue = objeto.value;
	sValue = sValue.toString().replace(/[A-Za-z$-]/g, "");
	fldLen = sValue.length;
	mskLen = sMask.length;

	i = 0;
	nCount = 0;
	sCod = "";
	mskLen = fldLen;

	var objRegExpMil = new RegExp('(-?[0-9]+)([0-9]{3})');
	while (sValue.indexOf(sMask) != -1)
		sValue = sValue.replace(sMask, "");
	while (sValue.indexOf(" ") != -1)
		sValue = sValue.replace(" ", "");
	while (sValue.indexOf(",") != -1)
		sValue = sValue.replace(",", "");
	while (sValue.indexOf(".") != -1)
		sValue = sValue.replace(".", "");

	if (sValue.length > 2) {
		sValue = sValue.charAt(0) == 0 ? sValue.slice(1, sValue.length)
				: sValue;
		sValueInt = sValue.slice(0, sValue.length - 2);
		sValueCen = sValue.slice(sValue.length - 2, sValue.length);
	} else {
		for (var i = 0; i < 3; i++) {
			sValueInt = 0;
			sValueCen = sValue.length > 1 ? sValue : "0" + sValue;
		}
	}
	while (objRegExpMil.test(sValueInt))
		sValueInt = sValueInt.replace(objRegExpMil, '$1.$2');

	sCod = (sMask != "|" ? sMask + " " : "") + (sValueInt ? sValueInt : 0)
			+ "," + sValueCen;

	objeto.value = sCod;
}

function floatBoxFormat(objeto, sMask, evtKeyPress) {
	var sValue, fldLen, sCod;
	
		sValue = objeto.value;
		sValue = sValue.toString().replace(/[A-Za-z$-]/g, "");
		fldLen = sValue.length;
		mskLen = sMask.length;

		i = 0;
		nCount = 0;
		sCod = "";
		mskLen = fldLen;

		var objRegExpMil = new RegExp('(-?[0-9]+)([0-9]{3})');
		while (sValue.indexOf(sMask) != -1)
			sValue = sValue.replace(sMask, "");
		while (sValue.indexOf(" ") != -1)
			sValue = sValue.replace(" ", "");
		while (sValue.indexOf(",") != -1)
			sValue = sValue.replace(",", "");
		while (sValue.indexOf(".") != -1)
			sValue = sValue.replace(".", "");

		if (sValue.length > 2) {
			sValue = sValue.charAt(0) == 0 ? sValue.slice(1, sValue.length)
					: sValue;
			sValueInt = sValue.slice(0, sValue.length - 1);
			sValueCen = sValue.slice(sValue.length - 1, sValue.length);
		} else {
			for (var i = 0; i < 3; i++) {
				sValueInt = 0;
				sValueCen = sValue.length > 1 ? sValue : "0" + sValue;
			}
		}
		while (objRegExpMil.test(sValueInt))
			sValueInt = sValueInt.replace(objRegExpMil, '$1.$2');

		sCod = (sMask != "|" ? sMask + " " : "") + (sValueInt ? sValueInt : 0)
				+ "," + sValueCen;

		objeto.value = sCod;
}
