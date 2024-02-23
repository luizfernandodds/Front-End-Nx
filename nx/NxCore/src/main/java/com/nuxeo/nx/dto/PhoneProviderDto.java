package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class PhoneProviderDto implements Serializable {

	private static final long serialVersionUID = 1394323378154014456L;
	private Long id;
	private String apn;
	private String name;
	private String apnUser;
	private String apnPass;
	private CustomerDto customer;
	private List<PhoneLineDto> phoneLines;

	public PhoneProviderDto() {
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
		PhoneProviderDto other = (PhoneProviderDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}