package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AttendanceAttachmentsDto implements Serializable {

	private static final long serialVersionUID = -401404802150186533L;
	public static final String ATTACH_FIND_ALL = "AttendanceAttachments.findAll";
	public static final String ATTACH_FIND_ATTENDANCE = "AttendanceAttachments.findByAttendance";

	private Long id;
	private AttendanceDto attendance;
	private String name;
	private String path;
	private Date dateCreate;
	private boolean newFile;
	
	public AttendanceAttachmentsDto() {
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AttendanceAttachmentsDto other = (AttendanceAttachmentsDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}