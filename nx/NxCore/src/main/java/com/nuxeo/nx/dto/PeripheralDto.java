package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class PeripheralDto implements Serializable {
	
	private static final long serialVersionUID = -5880415664642043385L;
	
	private Long id;
	private PeripheralTypeDto peripheralType;
	private String name;
	private String serial;
	private String description;
	private CustomerDto customer;
	private ProviderDto provider;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;

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
		PeripheralDto other = (PeripheralDto) obj;
		return Objects.equals(id, other.id);
	}
}