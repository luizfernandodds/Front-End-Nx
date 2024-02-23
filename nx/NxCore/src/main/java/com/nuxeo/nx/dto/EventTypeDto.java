package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class EventTypeDto implements Serializable {

	private static final long serialVersionUID = 6237274318625698327L;
	private Long id;
	private String i18n_name;
	private String i18n_description;

	public EventTypeDto() {
	}

	public EventTypeDto(Long id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EventTypeDto other = (EventTypeDto) obj;
		return Objects.equals(id, other.id);
	}

}