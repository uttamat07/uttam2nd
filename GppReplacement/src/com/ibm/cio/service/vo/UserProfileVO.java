
package com.ibm.cio.service.vo;

public class UserProfileVO implements Comparable{

    private String firstName;
    private String lastName;
    private String intranetId;

    public UserProfileVO() {
    }

	public UserProfileVO(String firstName, String lastName, String intranetId) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.intranetId = intranetId;
	}

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIntranetId() {
        return intranetId;
    }

    public void setIntranetId(String intranetId) {
        this.intranetId = intranetId;
    }

    public String getName() {
        return this.firstName + " " + this.lastName;
    }

	@Override
	public String toString() {
		return "UserProfileVO [firstName=" + firstName + ", lastName="
				+ lastName + ", intranetId=" + intranetId + "]";
	}
    
    
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((intranetId == null) ? 0 : intranetId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserProfileVO other = (UserProfileVO) obj;
		if (intranetId == null) {
			if (other.intranetId != null)
				return false;
		} else if (!intranetId.equals(other.intranetId)){
			//System.out.println(intranetId+" -- other "+other.intranetId );
			return false;
		}
		//System.out.println(intranetId+" ELSE -- OTHER "+other.intranetId );
		return true;
	}

	@Override
	public int compareTo(Object o) {
		// TODO Auto-generated method stub
		int compareID=((UserProfileVO)o).getIntranetId().hashCode();
		return (compareID) - this.intranetId.hashCode();
	}



}