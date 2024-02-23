package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TargetRfidDto implements Serializable {

	private static final long serialVersionUID = -8587274388113370349L;
	
	private Long id;
	private TargetDto target;
	private DriverDto driver;
	private Long sequencia;
	private Long loginCreate;
	private LocalDateTime dateCreate;
	private Long loginDelete;
	private Date dateDelete;

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
		TargetRfidDto other = (TargetRfidDto) obj;
		return Objects.equals(id, other.id);
	}

	
}