package com.nuxeo.nx.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the login database table.
 * 
 */
@ToString
@Getter
@Setter
public class EventTargetDto implements Serializable {

	private static final long serialVersionUID = -1730123290838467091L;
	private Long id;
	private Long targetId;
	private EventDto event;
	
	public EventTargetDto() {
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
		EventTargetDto other = (EventTargetDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}