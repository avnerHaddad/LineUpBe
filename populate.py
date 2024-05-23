import psycopg2
from datetime import datetime, timedelta

# Database connection parameters
DB_NAME = "LineUp"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_HOST = "localhost"
DB_PORT = "5432"

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)

# Create a cursor object
cur = conn.cursor()


# Function to create tables
def create_tables():
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        created_at TIMESTAMP,
        is_admin BOOLEAN
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Constraints (
        user_id INTEGER,
        startAt TIMESTAMP,
        endAt TIMESTAMP,
        isConfirmed BOOLEAN
    );
    """)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        jobType VARCHAR(255)
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Shifts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        preference FLOAT,
        shiftStartTime TIMESTAMP,
        shiftEndTime TIMESTAMP,
        job_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (job_id) REFERENCES jobs(id)
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Preferences (
        user_id INTEGER,
        shift_id INTEGER,
        preference INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (shift_id) REFERENCES Shifts(id)
    );
    """)



    cur.execute("""
    CREATE TABLE IF NOT EXISTS CurrentRecurringShifts (
        id SERIAL PRIMARY KEY,
        shiftDay VARCHAR(50),
        shiftStartHour TIMESTAMP,
        shiftEndHour TIMESTAMP,
        shiftJobId INTEGER,
        FOREIGN KEY (shiftJobId) REFERENCES jobs(id)
    );
    """)



    cur.execute("""
    CREATE TABLE IF NOT EXISTS jobs_to_users (
        job_id INTEGER,
        user_id INTEGER,
        PRIMARY KEY (job_id, user_id),
        FOREIGN KEY (job_id) REFERENCES jobs(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    """)

    conn.commit()


# Function to populate tables with sample data
def populate_tables():
    # Insert job types into jobs table and fetch IDs
    job_types = ['tech', 'matzat', 'mamash', 'guard']
    job_ids = {}
    for job_type in job_types:
        cur.execute("""
        INSERT INTO jobs (jobType) VALUES (%s) RETURNING id;
        """, (job_type,))
        job_id = cur.fetchone()[0]
        job_ids[job_type] = job_id

    # Insert users into users table and fetch IDs
    users = [
        ('goren', '2024-05-17 00:00:00', False),
        ('avner', '2024-05-17 00:00:00', False),
        ('eilam', '2024-05-17 00:00:00', False),
        ('alon', '2024-05-17 00:00:00', False),
        ('tom', '2024-05-17 00:00:00', False),
        ('hony', '2024-05-17 00:00:00', False),
        ('nirdu', '2024-05-17 00:00:00', False),
        ('privega', '2024-05-17 00:00:00', False)
    ]
    user_ids = {}
    for user in users:
        cur.execute("""
        INSERT INTO users (username, created_at, is_admin) VALUES (%s, %s, %s) RETURNING id;
        """, user)
        user_id = cur.fetchone()[0]
        user_ids[user[0]] = user_id

    # Associate users with job types in jobs_to_users table
    jobs_to_users = [
        (job_ids['tech'], user_ids['goren']),
        (job_ids['tech'], user_ids['avner']),
        (job_ids['tech'], user_ids['eilam']),
        (job_ids['tech'], user_ids['alon']),
        (job_ids['matzat'], user_ids['tom']),
        (job_ids['matzat'], user_ids['hony']),
        (job_ids['guard'], user_ids['alon']),
        (job_ids['guard'], user_ids['nirdu']),
        (job_ids['guard'], user_ids['privega'])
    ]
    cur.executemany("""
    INSERT INTO jobs_to_users (job_id, user_id) VALUES (%s, %s);
    """, jobs_to_users)

    # Insert recurring shifts into CurrentRecurringShifts table
    shift_times = [
        ('08:00:00', '16:00:00'),
        ('16:00:00', '00:00:00'),
        ('00:00:00', '08:00:00')
    ]
    days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    for job_id in job_ids.values():
        for day in days_of_week:
            for start_time, end_time in shift_times:
                cur.execute("""
                INSERT INTO CurrentRecurringShifts (shiftDay, shiftStartHour, shiftEndHour, shiftJobId) 
                VALUES (%s, %s, %s, %s);
                """, (day, f"2024-05-17 {start_time}", f"2024-05-17 {end_time}", job_id))

    # Insert sample data into Constraints, Preferences, and Shifts tables
    cur.execute("""
    INSERT INTO Constraints (user_id, startAt, endAt, isConfirmed) VALUES
    (%s, %s, %s, TRUE),
    (%s, %s, %s, FALSE);
    """, (
        user_ids['goren'], datetime.now(), datetime.now() + timedelta(hours=4),
        user_ids['avner'], datetime.now() + timedelta(days=1), datetime.now() + timedelta(days=1, hours=4)
    ))

    cur.execute("""
    INSERT INTO Shifts (user_id, preference, shiftStartTime, shiftEndTime, job_id) VALUES
    (%s, 0.5, %s, %s, %s),
    (%s, 0.8, %s, %s, %s)
    RETURNING id;
    """, (
        user_ids['goren'], datetime.now(), datetime.now() + timedelta(hours=8), job_ids['tech'],
        user_ids['tom'], datetime.now() + timedelta(days=1), datetime.now() + timedelta(days=1, hours=8),
        job_ids['matzat']
    ))
    shift_ids = cur.fetchall()

    cur.execute("""
    INSERT INTO Preferences (user_id, shift_id, preference) VALUES
    (%s, %s, 1),
    (%s, %s, 2);
    """, (
        user_ids['goren'], shift_ids[0][0],
        user_ids['tom'], shift_ids[1][0]
    ))

    conn.commit()


# Execute functions
create_tables()
populate_tables()

# Close the cursor and connection
cur.close()
conn.close()
