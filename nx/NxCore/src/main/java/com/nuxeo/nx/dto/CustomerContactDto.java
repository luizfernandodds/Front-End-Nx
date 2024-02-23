package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerContactDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private CustomerContactTypeDto clientContactType;
	private String name;
	private String contact1;
	private String contact2;
	private String email;
	private LocalDateTime dateCreate;
	private LocalDateTime dateUpdate;
	
	public CustomerContactDto() {
	}

	@Override
	public int hashCode() {
		return Objects.hash(clientContactType, contact1, contact2, dateCreate, dateUpdate, email, id, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CustomerContactDto other = (CustomerContactDto) obj;
		return Objects.equals(clientContactType, other.clientContactType) && Objects.equals(contact1, other.contact1)
				&& Objects.equals(contact2, other.contact2) && Objects.equals(dateCreate, other.dateCreate)
				&& Objects.equals(dateUpdate, other.dateUpdate) && Objects.equals(email, other.email)
				&& Objects.equals(id, other.id) && Objects.equals(name, other.name);
	}
}
