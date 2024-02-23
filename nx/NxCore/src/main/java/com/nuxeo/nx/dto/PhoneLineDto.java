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
public class PhoneLineDto implements Serializable {

	private static final long serialVersionUID = -8999096996107282971L;
	private Long id;
	private LocalDateTime deleted;
	private String number;
	private String sim;
	private String apn;
	private String apnUser;
	private String apnPass;
	private PhoneProviderDto phoneProvider;
	private CustomerDto customer;
//	private DeviceDto device;

	public PhoneLineDto() {
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
		PhoneLineDto other = (PhoneLineDto) obj;
		return Objects.equals(id, other.id);
	}
	
}