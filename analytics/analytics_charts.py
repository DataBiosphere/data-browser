import analytics_api as ga
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


def format_fancy_chart(df):
    df2 = df.copy(deep=True)
    
    data_cols = [c for c in df2.columns]
    
    df2['Quarter'] = df2.index.quarter
    df2['Year'] = df2.index.year

    df2 = df2.groupby(['Year','Quarter']).sum()
    
    df2.columns = pd.MultiIndex.from_tuples([(name, 'Value') for name in data_cols])
    
    for name in data_cols:
        df2[(name, '% Change')] = df2[name].pct_change().mul(100)
    
    df2 = df2[[(a, b) for a in data_cols for b in ['Value', '% Change']]]
    
    s = df2.style.format(na_rep='', formatter={(name, '% Change'): '({:.2f}%)' for name in data_cols})
    s = s.applymap(lambda v: 'color: red' if v < 0 else 'color: green' if v > 0 else None, subset=[(name, '% Change') for name in data_cols])
    s = s.set_table_styles([
        {'selector': 'th.col_heading', 'props': 'text-align: center'},
        {'selector': 'thead > tr:nth-child(2)', 'props': 'display: none'},
        {'selector': 'td.col1, td.col3', 'props': 'text-align: left; padding-left: 0'}
    ], overwrite=False)

    return s

def plot_users_over_time(ga_property, start_date, end_date):

	metrics = 'ga:1dayUsers, ga:uniquePageviews'
	dimensions = 'ga:date'
	df = ga.get_metrics_by_dimensions(ga_property, metrics,dimensions, start_date, end_date)

	# Convert date to datetime object
	df["ga:date"] = pd.to_datetime(df['ga:date'])
	df.set_index('ga:date', inplace=True)

	# Convert strings returned by API to integers. Can we do this earlier!
	# If not numeric data the series won't graph
	df["ga:1dayUsers"] = df['ga:1dayUsers'].astype(str).astype(int)
	df["ga:uniquePageviews"] = df['ga:uniquePageviews'].astype(str).astype(int)


	# Rename for display
	df.rename(columns={'ga:1dayUsers':'Daily Users', 'ga:uniquePageviews':'Unique Pageviews'}, inplace=True)

	#Smooth (coiuld we not just use 7 day users then?)
	# df = df.rolling(window=1).mean()

	# Notes: Linking Mandas and Matplotlib
	# https://stackoverflow.com/questions/29568110/how-to-use-ax-with-pandas-and-matplotlib

	fontsize=16
	fig, ax = plt.subplots(figsize=(16, 9))
	df.plot(ax=ax) #Link the df with the axis

	ax.set_xlabel('Time', fontsize=fontsize)
	ax.set_ylabel('Count', fontsize=fontsize)

	for label in (ax.get_xticklabels() + ax.get_yticklabels()):
		label.set_fontsize(fontsize)

	plt.rcParams['font.size'] = fontsize
	fig.suptitle('Daily Activity Overview')
	plt.show()

	# Average per qurter

	dfmean = df.rolling(window=30).mean()
	fig, ax = plt.subplots(figsize=(16, 9))
	dfmean.plot(ax=ax) #Link the df with the axis

	ax.set_xlabel('Time', fontsize=fontsize)
	ax.set_ylabel('Count', fontsize=fontsize)

	for label in (ax.get_xticklabels() + ax.get_yticklabels()):
		label.set_fontsize(fontsize)

	plt.rcParams['font.size'] = fontsize
	fig.suptitle('Daily Activity Overview 30 Day average')
	plt.show()


	display(format_fancy_chart(df))

def plot_hbar(ga_property, title, xlabel, ylabel, metric, dimension, start_date, end_date):

	df = ga.get_metrics_by_dimensions(ga_property, metric,dimension, start_date, end_date)

	fontsize=16
	position = list(range(1, 20))

	df.set_index(dimension, inplace=True)
	df[metric] = df[metric].astype(str).astype(int)
	df = df.sort_values(by=[metric]).tail(20)

	fig, ax = plt.subplots(figsize=(16, 9))
	plt.barh(df.index, df[metric]) #Link the df with the axis

	fig.suptitle(title)
	ax.set_ylabel(ylabel)
	ax.set_xlabel(xlabel)


	for index, value in enumerate(df[metric]):
		plt.text(value, index,
			' ('+ str(value)+')')

	plt.rcParams['font.size'] = fontsize
	plt.show()
