package com.nuxeo.nx.entity;

import com.google.gson.annotations.SerializedName;

public class EmailEvent {
	@SerializedName("to_email")
	String toEmail = null;

	@SerializedName("reply_email")
	String replyEmail = null;

	@SerializedName("sbuject")
	String subject = null;

	@SerializedName("message")
	String message = null;

	@SerializedName("image")
	String image = null;

	public String getToEmail() {
		return toEmail;
	}

	public void setToEmail(String toEmail) {
		this.toEmail = toEmail;
	}

	public String getReplyEmail() {
		return replyEmail;
	}

	public void setReplyEmail(String replyEmail) {
		this.replyEmail = replyEmail;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
}