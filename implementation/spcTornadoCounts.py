import pandas as pd

df = pd.read_csv('/mnt/data3/scott/1950-2018_actual_tornadoes.csv')

df['date'] = pd.to_datetime(df['date'])
mask = (df['date'] >= '1979-1-1') & (df['date'] <= '2013-12-31')
df = df.loc[mask]
df.groupby('date').size()
df.groupby('date').size().to_csv('/mnt/data3/scott/tornadoCounts.csv')