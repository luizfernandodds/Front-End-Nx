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
public class ContactDto implements Serializable {

	private static final long serialVersionUID = 4024839257724585443L;
	private Long id;
	private OwnerDto owner;
	private CustomerDto customer;
	private String company;
	private String email;
	private String name;
	private String phone1;
	private String phone2;
	private String phone3;
	private CityDto city;
	private String addr;
	private String complement;
	private Integer number;
	private Integer zip;
	private LoginDto loginInsert;
	private LocalDateTime dateCreate;
	private LoginDto loginDelete;
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
		ContactDto other = (ContactDto) obj;
		return Objects.equals(id, other.id);
	}

	
}