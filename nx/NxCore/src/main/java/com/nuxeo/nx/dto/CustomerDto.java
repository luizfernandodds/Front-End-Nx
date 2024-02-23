package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDto implements Serializable {

	private static final long serialVersionUID = 6833728461556295852L;

	private Long id;
	private OwnerDto owner;
	private OwnerDto clientOwner;
	private CustomerContractDto contract;
	private CustomerContactDto contactAdministrative;
	private CustomerContactDto contactFinancial;
	private String document;
	private String loginCustomer;
	private String name;
	private String docName;
	private String docTag;
	private String phone;
	private String fax;
	private String email;
	private String address;
	private Integer number;
	private Integer zip;
	private Integer typeMap;
	private CityDto city;
	private LocalDateTime dateActive;
	private LocalDateTime dateDesactive;
	private LocalDateTime dateDelete;
	
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
		CustomerDto other = (CustomerDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}