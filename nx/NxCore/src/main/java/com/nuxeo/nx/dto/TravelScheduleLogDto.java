package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

@ToString
@Getter
@Setter
public class TravelScheduleLogDto implements Serializable {

	private static final long serialVersionUID = 1988431078000075957L;

	private Integer id;
	private Integer numberRomaneio;
	private String msgError;
	private LocalDateTime dateCreate;

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
		TravelScheduleLogDto other = (TravelScheduleLogDto) obj;
		return Objects.equals(id, other.id);
	}


}