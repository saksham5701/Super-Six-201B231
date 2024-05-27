import streamlit as st
import pandas as pd

# Title and description
st.title('Data-Driven Web Application')
st.write("Upload your CSV file to get started.")

# CSV Upload Service
uploaded_file = st.file_uploader("Choose a CSV file", type="csv")

if uploaded_file is not None:
    st.write("Uploading your file...")
    # Read the CSV file
    data = pd.read_csv(uploaded_file)
    st.success("File uploaded successfully!")

    # Displaying the data with pagination
    st.write("Displaying the data:")
    rows_per_page = 20
    total_rows = len(data)
    total_pages = (total_rows // rows_per_page) + 1

    page_number = st.number_input("Page number", min_value=1, max_value=total_pages, step=1, value=1)

    start_idx = (page_number - 1) * rows_per_page
    end_idx = start_idx + rows_per_page
    st.write(data.iloc[start_idx:end_idx])

    # Subscription Pricing Calculator
    st.write("Calculating subscription prices...")
    
    # Define base price and additional prices
    base_price = 100
    price_per_credit_line = 10
    price_per_credit_score_point = 0.1
    
    data['SubscriptionPrice'] = base_price + (price_per_credit_line * data['CreditLines']) + (price_per_credit_score_point * data['CreditScore'])

    st.write("Subscription prices calculated!")
    st.write(data[['Email', 'Name', 'CreditScore', 'CreditLines', 'SubscriptionPrice']])
else:
    st.warning("Please upload a CSV file.")
