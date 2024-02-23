package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerContractDto implements Serializable {

	private static final long serialVersionUID = 6833728461556295852L;

	private Long id;
	private Integer bill;
	private String table;
	private LocalDateTime date;
	private LocalDateTime dateValid;
	private LocalDateTime dateDelete;
	private LocalDateTime dateInsert;
	
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
		CustomerContractDto other = (CustomerContractDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}