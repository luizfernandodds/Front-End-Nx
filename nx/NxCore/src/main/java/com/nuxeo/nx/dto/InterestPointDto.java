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
public class InterestPointDto implements Serializable {

	private static final long serialVersionUID = -8989252811997616090L;
	
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private Date createdate;
	private String description;
	private String name;
	private String wkt;
	private String address;
	private Double latitude;
	private Double longitude;
	private Integer radius;
	private LocalDateTime dateDelete;

	public InterestPointDto() {
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
		InterestPointDto other = (InterestPointDto) obj;
		return Objects.equals(id, other.id);
	}

}