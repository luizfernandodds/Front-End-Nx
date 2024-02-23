package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AlertSpeedDto implements Serializable {

	private static final long serialVersionUID = 596578342919231207L;

	private Long id;

	private LocalDateTime dateUdpate;
	private LocalDateTime dateDelete;
	private LocalDateTime dateBegin;
	private LocalDateTime dateEnd;
	private LocalDateTime dateCreate;

	private int limit;
	private String name;
	private CustomerDto customer;

	public AlertSpeedDto() {
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
		AlertSpeedDto other = (AlertSpeedDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}