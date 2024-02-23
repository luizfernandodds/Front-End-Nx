package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AttachedFileDto implements Serializable {

	private static final long serialVersionUID = -8883986821975632296L;
	
	private Long id;
	private AttachmentTypeDto attachmentType;
	private DriverDto driver;
	private TargetDto target;
	private String name;
	private String path;
	private LocalDateTime dateCreate;
	
	public AttachedFileDto() {
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
		AttachedFileDto other = (AttachedFileDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}